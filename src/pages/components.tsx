import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import Badge from '@/components/atoms/Badge';
import Card from '@/components/atoms/Card';
import Avatar from '@/components/atoms/Avatar';
import FormField from '@/components/molecules/FormField';
import SearchBar from '@/components/molecules/SearchBar';
import KudosForm from '@/components/organisms/KudosForm';
import KudosCard from '@/components/molecules/KudosCard';

interface KudosFormData {
  recipientName: string;
  teamName: string;
  category: string;
  message: string;
}

const ComponentsPage = () => {
  const [searchValue, setSearchValue] = useState('');

  // Sample data for components
  const sampleKudos = {
    id: '123',
    recipientName: 'Sarah Johnson',
    teamName: 'Engineering',
    category: 'Teamwork',
    message: 'Thank you for stepping up and helping the team complete the project under a tight deadline. Your willingness to put in extra hours and mentor junior developers made all the difference!',
    createdBy: 'Michael Chen',
    createdAt: '2 days ago'
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    console.log('Search for:', value);
  };

  const handleSubmitKudos = (data: KudosFormData) => {
    console.log('Kudos submitted:', data);
    alert('Kudos form submitted!');
  };

  // Component section with title and description
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-12">
      <Typography variant="h3" className="mb-4 pb-2 border-b border-gray-200">
        {title}
      </Typography>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Typography variant="h2" bold className="mb-6">
          Component Showcase
        </Typography>
        
        <Typography variant="body1" className="mb-8">
          This page showcases all the components created for the Kudos application.
        </Typography>

        {/* Atoms */}
        <Section title="Atoms">
          {/* Buttons */}
          <div className="space-y-2">
            <Typography variant="h5" bold>Buttons</Typography>
            <div className="flex flex-wrap gap-4">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button disabled>Disabled Button</Button>
              <Button icon={<span>👉</span>}>With Icon</Button>
              <Button icon={<span>🔄</span>} iconPosition="right">
                Icon Right
              </Button>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-2">
            <Typography variant="h5" bold>Typography</Typography>
            <div className="space-y-2">
              <Typography variant="h1">Heading 1</Typography>
              <Typography variant="h2">Heading 2</Typography>
              <Typography variant="h3">Heading 3</Typography>
              <Typography variant="h4">Heading 4</Typography>
              <Typography variant="h5">Heading 5</Typography>
              <Typography variant="h6">Heading 6</Typography>
              <Typography variant="body1">Body 1 Text</Typography>
              <Typography variant="body2">Body 2 Text</Typography>
              <Typography variant="caption">Caption Text</Typography>
              <Typography variant="body1" color="primary">Primary Color</Typography>
              <Typography variant="body1" color="secondary">Secondary Color</Typography>
              <Typography variant="body1" color="error">Error Color</Typography>
              <Typography variant="body1" bold>Bold Text</Typography>
              <Typography variant="body1" italic>Italic Text</Typography>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-2">
            <Typography variant="h5" bold>Inputs</Typography>
            <div className="space-y-4 max-w-md">
              <Input placeholder="Basic Input" />
              <Input
                placeholder="With Icon"
                icon={<span>🔍</span>}
              />
              <Input
                placeholder="With Error"
                error="This field has an error"
              />
              <Input
                placeholder="Disabled Input"
                disabled
              />
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-2">
            <Typography variant="h5" bold>Badges</Typography>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="primary" rounded>Rounded</Badge>
              <Badge icon={<span>🔔</span>}>With Icon</Badge>
              <Badge size="small">Small</Badge>
              <Badge size="large">Large</Badge>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-2">
            <Typography variant="h5" bold>Cards</Typography>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <Typography variant="h6">Basic Card</Typography>
                <Typography variant="body2">Card with default styling</Typography>
              </Card>
              <Card elevation="md" className="p-4" bgColor="primary">
                <Typography variant="h6">Elevated Card</Typography>
                <Typography variant="body2">With primary background</Typography>
              </Card>
              <Card bordered className="p-4" clickable>
                <Typography variant="h6">Bordered Clickable Card</Typography>
                <Typography variant="body2">Click me!</Typography>
              </Card>
            </div>
          </div>

          {/* Avatars */}
          <div className="space-y-2">
            <Typography variant="h5" bold>Avatars</Typography>
            <div className="flex flex-wrap gap-6 items-end">
              <Avatar initials="JD" />
              <Avatar initials="JD" size="xs" />
              <Avatar initials="JD" size="sm" />
              <Avatar initials="JD" size="lg" />
              <Avatar initials="JD" size="xl" />
              <Avatar
                initials="JD"
                bgColor="primary"
              />
              <Avatar
                initials="JD"
                bgColor="secondary"
              />
              <Avatar
                src="https://randomuser.me/api/portraits/women/17.jpg"
                alt="Jane Doe"
              />
              <Avatar
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="John Smith"
                status="online"
              />
            </div>
          </div>
        </Section>

        {/* Molecules */}
        <Section title="Molecules">
          {/* FormField */}
          <div className="space-y-2">
            <Typography variant="h5" bold>Form Fields</Typography>
            <div className="max-w-md space-y-4">
              <FormField
                label="Name"
                name="name"
                placeholder="Enter your name"
              />
              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                helperText="We'll never share your email"
              />
              <FormField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                error="Password is too short"
              />
              <FormField
                label="With Icon"
                name="with-icon"
                placeholder="Search..."
                icon={<span>🔍</span>}
              />
            </div>
          </div>

          {/* SearchBar */}
          <div className="space-y-2">
            <Typography variant="h5" bold>Search Bar</Typography>
            <div className="max-w-md space-y-4">
              <SearchBar
                onSearch={handleSearch}
                initialValue={searchValue}
              />
              <SearchBar
                placeholder="Search with button..."
                onSearch={handleSearch}
                searchOnChange={false}
              />
              <SearchBar
                placeholder="Compact search..."
                onSearch={handleSearch}
                compact
                searchOnChange
              />
            </div>
          </div>
        </Section>

        {/* Organisms */}
        <Section title="Organisms">
                  {/* KudosCard */}
        <div className="space-y-2">
          <Typography variant="h5" bold>Kudos Card</Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KudosCard
              recipientName={sampleKudos.recipientName}
              teamName={sampleKudos.teamName}
              category={sampleKudos.category}
              message={sampleKudos.message}
              createdBy={sampleKudos.createdBy}
              createdAt={sampleKudos.createdAt}
              recipientImage="https://randomuser.me/api/portraits/women/44.jpg"
              senderImage="https://randomuser.me/api/portraits/men/32.jpg"
            />
            <KudosCard
              recipientName="Alex Johnson"
              teamName="Design"
              category="Innovation"
              message="Your creative approach to solving the UI challenges on our latest project was outstanding. The client specifically mentioned how intuitive the new interface is."
              createdBy="Maria Garcia"
              createdAt="1 week ago"
              recipientImage="https://randomuser.me/api/portraits/men/22.jpg"
              senderImage="https://randomuser.me/api/portraits/women/28.jpg"
            />
             <KudosCard
              recipientName="Alex Johnson"
              teamName="Design"
              category="Innovation"
              message="Your creative approach to solving the UI challenges on our latest project was outstanding. The client specifically mentioned how intuitive the new interface is."
              createdBy="Maria Garcia"
              createdAt="1 week ago"
              recipientImage="https://randomuser.me/api/portraits/men/22.jpg"
              senderImage="https://randomuser.me/api/portraits/women/28.jpg"
            />
            </div>
          </div>

          {/* KudosForm */}
          <div className="space-y-2">
            <Typography variant="h5" bold>Kudos Form</Typography>
            <KudosForm
              onSubmit={handleSubmitKudos}
              onCancel={() => console.log('Form cancelled')}
            />
          </div>
        </Section>

      
      </div>
    </MainLayout>
  );
};

export default ComponentsPage; 