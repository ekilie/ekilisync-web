// Data for Landing Page sections

export const howItWorksSteps = [
  {
    step: '01',
    title: 'Setup Your Office',
    description:
      'Define your office location and set attendance parameters. Quick 5-minute setup process.',
  },
  {
    step: '02',
    title: 'Add Your Team',
    description:
      'Invite employees to download the app and join your organization workspace.',
  },
  {
    step: '03',
    title: 'Track Automatically',
    description:
      'Employees are automatically checked in/out when they arrive at or leave the office location.',
  },
];

export const pricingPlans = {
  monthly: [
    {
      name: 'Free',
      price: 'Free',
      description: 'Perfect for trying out EkiliSync.',
      features: [
        'Up to 5 employees',
        'Basic attendance tracking',
        'Mobile app access',
        'Community support',
      ],
      cta: 'Get Early Access',
      priceNote: 'Forever free',
    },
    {
      name: 'Starter',
      price: 'TZS 7,200',
      description: 'Perfect for small teams and startups.',
      features: [
        'Up to 10 employees',
        'Basic attendance tracking',
        'Mobile app access',
        'Email support',
      ],
      cta: 'Get Early Access',
      popular: true,
      priceNote: '',
    },
    {
      name: 'Professional',
      price: 'TZS 12,000',
      description: 'Ideal for growing businesses.',
      features: [
        'Up to 100 employees',
        'Advanced reporting',
        'Custom work schedules',
        'Priority support',
        'API access',
      ],
      cta: 'Get Early Access',
      priceNote: '',
    },
  
  ],
  annually: [
    {
      name: 'Free',
      price: 'Free',
      description: 'Perfect for trying out EkiliSync.',
      features: [
        'Up to 5 employees',
        'Basic attendance tracking',
        'Mobile app access',
        'Community support',
      ],
      cta: 'Get Early Access',
      priceNote: 'Forever free',
    },
    {
      name: 'Starter',
      price: 'TZS 5,760',
      description: 'Perfect for small teams and startups.',
      features: [
        'Up to 10 employees',
        'Basic attendance tracking',
        'Mobile app access',
        'Email support',
      ],
      cta: 'Get Early Access',
      popular: true,
      priceNote: '',
    },
    {
      name: 'Professional',
      price: 'TZS 9,600',
      description: 'Ideal for growing businesses.',
      features: [
        'Up to 100 employees',
        'Advanced reporting',
        'Custom work schedules',
        'Priority support',
        'API access',
      ],
      cta: 'Get Early Access',
      priceNote: '',
    },
  ],
};

export const faqs = [
  {
    question: 'How accurate is the location-based tracking?',
    answer:
      'ekiliSync uses advanced GPS and geofencing technology to ensure high accuracy. The system can detect when employees are within the designated office area with precision of a few meters, minimizing false check-ins while ensuring reliable attendance tracking.',
  },
  {
    question: 'What happens if an employee forgets their phone?',
    answer:
      'Employees can manually check in through the web dashboard or request manual entry from their manager. The system also allows for retroactive attendance corrections with proper approval workflows.',
  },
  {
    question: 'Is my location data secure and private?',
    answer:
      "Absolutely. ekiliSync only tracks location when you're near your designated workplace and only stores the check-in/check-out events, not continuous location data. All data is encrypted and we follow strict privacy regulations including GDPR compliance.",
  },
  {
    question: 'Can I set up multiple office locations?',
    answer:
      'Yes, ekiliSync supports multiple office locations. You can set up different geofenced areas for each office, and employees can be assigned to specific locations or have access to multiple locations as needed.',
  },
  {
    question: 'How does the free trial work?',
    answer:
      'Our 30-day free trial gives you full access to all features of your selected plan. No credit card is required to start, and you can invite your entire team to test the system. You can cancel anytime during the trial with no obligations.',
  },
  {
    question: 'Do you offer integrations with payroll systems?',
    answer:
      'Yes, ekiliSync integrates with popular payroll and HR systems including QuickBooks, ADP, BambooHR, and many others. We also provide API access for custom integrations. Our Enterprise plan includes dedicated support for complex integrations.',
  },
]; 