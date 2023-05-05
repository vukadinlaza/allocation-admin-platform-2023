import { TabData } from '@/types';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Tabs({ tabs }: { tabs: TabData[] }) {
  const [value, setValue] = useState('');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue.toString());
  };

  useEffect(() => {
    setValue(tabs[0].title);
  }, [tabs]);

  return (
    <TabContext value={value}>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '12px' }}
      >
        <TabList onChange={handleChange} aria-label="example">
          {tabs &&
            tabs.map((tab, index) => (
              <Tab
                disabled={tab.disabled}
                key={index}
                label={tab.title}
                value={tab.title}
              />
            ))}
        </TabList>
      </Box>
      {tabs &&
        tabs.map((tab, index) => (
          <TabPanel sx={{ padding: 0 }} key={index} value={tab.title}>
            {tab.component && <tab.component />}
          </TabPanel>
        ))}
    </TabContext>
  );
}
