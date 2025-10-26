export interface Job {
  id: number;
  company: string;
  logo: string;
  title: string;
  website: string;
  postedTime: string;
  tags: string[];
  tagColors: string[];
  status: 'Apply' | 'Applied';
  isSaved: boolean;
  description: string;
  location?: string;
  salary?: string;
  jobType?: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  important_tags: string[];
}

export const jobsData: Job[] = [
  {
    id: 1,
    company: 'Google',
    logo: '',
    title: 'Product Designer',
    website: 'google.com',
    postedTime: '4d ago',
    tags: ['Matched', 'Remote', 'Design'],
    tagColors: ['bg-green-600', 'bg-slate-600', 'bg-purple-600'],
    status: 'Applied',
    isSaved: false,
    location: 'Mountain View, CA',
    salary: 'USD 120,000 - 180,000',
    jobType: 'Remote',
    important_tags: ['Matched', 'Remote', 'Awaiting Feedback'],
    description: 'This Product Design role at Google is a remote opportunity that aligns with your passion for creating intuitive, high-impact digital experiences. As a growing technology company, it offers room to shape design systems, improve user workflows, and directly influence product direction. Work on products used by billions worldwide.'
  },
  {
    id: 2,
    company: 'Netflix',
    logo: '',
    title: 'Marketing Consultant',
    website: 'netflix.com',
    postedTime: '1d ago',
    tags: ['Matched', 'Marketing', 'Consultant'],
    tagColors: ['bg-green-600', 'bg-blue-600', 'bg-orange-600'],
    status: 'Apply',
    isSaved: true,
    location: 'Los Gatos, CA',
    salary: 'USD 90,000 - 130,000',
    jobType: 'Full-time',
    important_tags: ['Matched'],
    description: 'Join Netflix as a Marketing Consultant and help drive brand strategies for the world\'s leading streaming entertainment service. You\'ll work on exciting campaigns, analyze market trends, and contribute to content positioning strategies.'
  },
  {
    id: 3,
    company: 'Meta',
    logo: '',
    title: 'User Experience Designer',
    website: 'meta.com',
    postedTime: '1d ago',
    tags: ['Matched', 'UX Design', 'Tech'],
    tagColors: ['bg-green-600', 'bg-purple-600', 'bg-indigo-600'],
    status: 'Apply',
    isSaved: true,
    location: 'Menlo Park, CA',
    salary: 'USD 130,000 - 190,000',
    jobType: 'Full-time',
    important_tags: ['Matched'],
    description: 'As a UX Designer at Meta, you\'ll be responsible for creating seamless digital experiences for billions of users across Facebook, Instagram, and WhatsApp. Work with cross-functional teams to design innovative solutions for social media and virtual reality.'
  },
  {
    id: 4,
    company: 'Microsoft',
    logo: '',
    title: 'Senior Frontend Developer',
    website: 'microsoft.com',
    postedTime: '2d ago',
    tags: ['Saved', 'Frontend', 'Senior Level'],
    tagColors: ['bg-blue-600', 'bg-cyan-600', 'bg-yellow-600'],
    status: 'Apply',
    isSaved: true,
    location: 'Remote',
    salary: 'USD 140,000 - 200,000',
    jobType: 'Remote',
    important_tags: ['Remote'],
    description: 'Join Microsoft\'s global team as a Senior Frontend Developer. Build cutting-edge web applications using React, TypeScript, and modern development tools. Work on products used by millions worldwide including Office 365 and Azure.'
  },
  {
    id: 5,
    company: 'Apple',
    logo: '',
    title: 'iOS Engineer',
    website: 'apple.com',
    postedTime: '3d ago',
    tags: ['Hot', 'iOS', 'Mobile'],
    tagColors: ['bg-red-600', 'bg-emerald-600', 'bg-indigo-600'],
    status: 'Applied',
    isSaved: false,
    location: 'Cupertino, CA',
    salary: 'USD 150,000 - 220,000',
    jobType: 'Full-time',
    important_tags: ['Awaiting Feedback'],
    description: 'Be part of Apple\'s iOS development team! Work on native iOS applications that power the iPhone and iPad experience. Collaborate with world-class designers and engineers to create innovative mobile experiences.'
  },
  {
    id: 6,
    company: 'Amazon',
    logo: '',
    title: 'Product Manager',
    website: 'amazon.com',
    postedTime: '5d ago',
    tags: ['Product', 'Management', 'Remote'],
    tagColors: ['bg-green-600', 'bg-orange-600', 'bg-slate-600'],
    status: 'Applied',
    isSaved: true,
    location: 'Seattle, WA',
    salary: 'USD 120,000 - 170,000',
    jobType: 'Full-time',
    important_tags: ['Remote'],
    description: 'Lead product development at Amazon, the world\'s largest e-commerce platform. Drive product strategy, work with engineering teams, and shape the future of cloud computing and retail technology.'
  },
  {
    id: 7,
    company: 'Spotify',
    logo: '',
    title: 'Data Scientist',
    website: 'spotify.com',
    postedTime: '1w ago',
    tags: ['Data Science', 'Analytics', 'Remote'],
    tagColors: ['bg-cyan-600', 'bg-blue-600', 'bg-slate-600'],
    status: 'Applied',
    isSaved: false,
    location: 'Stockholm, Sweden',
    salary: 'EUR 70,000 - 95,000',
    jobType: 'Remote',
    important_tags: ['Remote', 'Awaiting Feedback'],
    description: 'Join Spotify\'s data team and help derive insights from music streaming data. Build recommendation algorithms, create personalized playlists, and drive data-driven decision making for 400+ million users.'
  },
  {
    id: 8,
    company: 'Uber',
    logo: '',
    title: 'Mobile App Developer',
    website: 'uber.com',
    postedTime: '6d ago',
    tags: ['Mobile', 'React Native', 'Full Stack'],
    tagColors: ['bg-purple-600', 'bg-gray-600', 'bg-green-600'],
    status: 'Applied',
    isSaved: true,
    location: 'San Francisco, CA',
    salary: 'USD 130,000 - 180,000',
    jobType: 'Full-time',
    important_tags: ['Awaiting Feedback'],
    description: 'Develop mobile applications for Uber\'s global transportation platform. Work with cutting-edge mobile technologies including React Native and reach millions of riders and drivers worldwide.'
  }
];