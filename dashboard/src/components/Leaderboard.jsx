import { Table, Badge, Button, Group, Text, ScrollArea, Avatar } from '@mantine/core';
import { useState } from 'react';
import CandidateModal from './CandidateModal';
import { IconTrophy } from '@tabler/icons-react';

export default function Leaderboard({ data }) {
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    // Sort by total score desc
    const sortedData = [...data].sort((a, b) => b.average_score - a.average_score).slice(0, 10);

    const rows = sortedData.map((element, index) => (
        <Table.Tr key={element.id}>
            <Table.Td>
                {index === 0 && <IconTrophy size={16} color="gold" />}
                {index === 1 && <IconTrophy size={16} color="silver" />}
                {index === 2 && <IconTrophy size={16} color="brown" />}
                {index > 2 && <Text size="sm" c="dimmed">{index + 1}</Text>}
            </Table.Td>
            <Table.Td>
                <Group gap="sm">
                    <Avatar color="blue" radius="xl">{element.name.charAt(0)}</Avatar>
                    <Text size="sm" fw={500}>{element.name}</Text>
                </Group>
            </Table.Td>
            <Table.Td>{element.experience_years} yrs</Table.Td>
            <Table.Td>
                <Badge color={element.average_score > 8 ? 'green' : element.average_score > 6 ? 'yellow' : 'red'}>
                    {element.average_score}
                </Badge>
            </Table.Td>
            <Table.Td>
                <Button variant="light" size="xs" onClick={() => setSelectedCandidate(element)}>
                    View
                </Button>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <ScrollArea>
                <Table verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Rank</Table.Th>
                            <Table.Th>Candidate</Table.Th>
                            <Table.Th>Exp</Table.Th>
                            <Table.Th>Score</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>

            {selectedCandidate && (
                <CandidateModal
                    candidate={selectedCandidate}
                    opened={!!selectedCandidate}
                    onClose={() => setSelectedCandidate(null)}
                />
            )}
        </>
    );
}
