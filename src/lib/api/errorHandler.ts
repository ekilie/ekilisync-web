import { toast } from 'sonner';

export class ApiErrorHandler {
  static handle(error: any): string {
    console.error('API Error:', error);

    // Handle network errors
    if (!error.response) {
      const message = 'Network error. Please check your connection.';
      toast.error(message);
      return message;
    }

    // Handle HTTP errors
    const { status, data } = error.response;
    let message = 'An unexpected error occurred.';

    switch (status) {
      case 400:
        message = data?.message || 'Bad request. Please check your input.';
        break;
      case 401:
        message = 'Authentication required. Please log in.';
        // Redirect to login on 401
        window.location.href = '/sign-in';
        break;
      case 403:
        message = 'Access denied. You don\'t have permission to perform this action.';
        break;
      case 404:
        message = data?.message || 'The requested resource was not found.';
        break;
      case 422:
        message = this.handleValidationErrors(data);
        break;
      case 429:
        message = 'Too many requests. Please try again later.';
        break;
      case 500:
        message = 'Server error. Please try again later.';
        break;
      case 503:
        message = 'Service temporarily unavailable. Please try again later.';
        break;
      default:
        message = data?.message || `Error ${status}: ${error.response.statusText}`;
    }

    toast.error(message);
    return message;
  }

  private static handleValidationErrors(data: any): string {
    if (data?.errors && Array.isArray(data.errors)) {
      return data.errors.map((err: any) => err.message || err).join(', ');
    }
    if (data?.message) {
      return data.message;
    }
    return 'Validation failed. Please check your input.';
  }

  static handleSuccess(message: string, data?: any): void {
    toast.success(message);
    if (data && process.env.NODE_ENV === 'development') {
      console.log('API Success:', data);
    }
  }

  static handleLoading<T>(promise: Promise<T>, loadingMessage: string = 'Loading...'): Promise<T> {
    return new Promise((resolve, reject) => {
      toast.promise(promise, {
        loading: loadingMessage,
        success: (data: any) => {
          resolve(data);
          return data?.message || 'Operation completed successfully';
        },
        error: (error: any) => {
          const message = this.handle(error);
          reject(new Error(message));
          return message;
        },
      });
    });
  }
}

export const handleApiError = ApiErrorHandler.handle;
export const handleApiSuccess = ApiErrorHandler.handleSuccess;
export const handleApiLoading = ApiErrorHandler.handleLoading;