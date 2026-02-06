import { Modal, Text, Group, Stack, Badge, Grid, Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

export default function CandidateModal({ candidate, opened, onClose }) {
    if (!candidate) return null;

    const chartData = [
        { subject: 'Crisis Mgmt', A: candidate.crisis_management_score, fullMark: 10 },
        { subject: 'Sustainability', A: candidate.sustainability_score, fullMark: 10 },
        { subject: 'Motivation', A: candidate.team_motivation_score, fullMark: 10 },
    ];

    return (
        <Modal opened={opened} onClose={onClose} title={candidate.name} size="lg">
            <Grid>
                <Grid.Col span={6}>
                    <Stack>
                        <Text size="sm" c="dimmed">Experience</Text>
                        <Text fw={500}>{candidate.experience_years} Years</Text>

                        <Text size="sm" c="dimmed">Skills</Text>
                        <Group gap="xs">
                            {candidate.skills.split(', ').map(skill => (
                                <Badge key={skill} variant="outline">{skill}</Badge>
                            ))}
                        </Group>

                        <Text size="sm" c="dimmed" mt="md">Scores</Text>
                        <Text>Crisis: <Text span fw={700}>{candidate.crisis_management_score}</Text></Text>
                        <Text>Sustain: <Text span fw={700}>{candidate.sustainability_score}</Text></Text>
                        <Text>Motivation: <Text span fw={700}>{candidate.team_motivation_score}</Text></Text>
                    </Stack>
                </Grid.Col>

                <Grid.Col span={6}>
                    <Text size="sm" c="dimmed" ta="center">Skill Heatmap</Text>
                    <RadarChart cx={120} cy={120} outerRadius={80} width={250} height={250} data={chartData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis angle={30} domain={[0, 10]} />
                        <Radar name={candidate.name} dataKey="A" stroke="#228be6" fill="#228be6" fillOpacity={0.6} />
                    </RadarChart>
                    <Button
                        fullWidth
                        mt="md"
                        variant="gradient"
                        gradient={{ from: 'orange', to: 'red' }}
                        onClick={() => {
                            notifications.show({
                                title: 'Candidate Shared',
                                message: `Detailed profile of ${candidate.name} has been sent to HR.`,
                                color: 'green'
                            });
                        }}
                    >
                        Share Candidate
                    </Button>
                </Grid.Col>
            </Grid>
        </Modal>
    );
}
