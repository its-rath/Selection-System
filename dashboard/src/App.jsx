import { AppShell, Burger, Group, Title, Text, Container, Paper, SimpleGrid, ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconRecycle, IconSun, IconMoon } from '@tabler/icons-react';
import Leaderboard from './components/Leaderboard';
import candidates from './dummy_data.json';
import cx from 'clsx';
import classes from './App.module.css'; // We might need to create this for specific animation, or just use inline styles/mantine props

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  // Quick Stats
  const topScore = Math.max(...candidates.map(c => c.average_score));
  const avgCrisis = (candidates.reduce((acc, c) => acc + c.crisis_management_score, 0) / candidates.length).toFixed(1);

  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <IconRecycle size={30} color="green" />
            <Title order={3}>G CP Selection System</Title>
          </Group>
          <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            {computedColorScheme === 'dark' ? <IconSun size={20} stroke={1.5} /> : <IconMoon size={20} stroke={1.5} />}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="xl">
          <Group mb="lg">
            <Text size="xl" fw={700}>Dashboard Overview</Text>
          </Group>

          {/* Quick Stats Cards */}
          <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" mb="xl">
            <Paper shadow="xs" p="xl" radius="md" withBorder>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Total Candidates</Text>
              <Text fw={700} size="xl">{candidates.length}</Text>
            </Paper>
            <Paper shadow="xs" p="xl" radius="md" withBorder>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Highest Score</Text>
              <Text fw={700} size="xl" c="blue">{topScore}</Text>
            </Paper>
            <Paper shadow="xs" p="xl" radius="md" withBorder>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>Avg Crisis Score</Text>
              <Text fw={700} size="xl" c="orange">{avgCrisis}</Text>
            </Paper>
          </SimpleGrid>

          {/* Main Content Area */}
          <Leaderboard data={candidates} />

        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
