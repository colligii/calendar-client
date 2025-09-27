"use client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react";

const days = Array.from({ length: 30 }, (_, index) => index + 1);
const hours = Array.from({ length: 24 }, (_, index) => index);

export default function CalendarGrid() {
    const [month, setMonth] = useState('Janeiro');
    const [year, setYear] = useState(2025);
    const [events, setEvents] = useState({
        1: [
            {
                startSeconds: 1800,
                endSeconds: 10800,
                eventName: 'Evento Teste',
                border: '#d81bb8ff',
                color: '#d81bb856',
                id: '1234' 
            }
        ],
        4: [
            {
                startSeconds: 1800,
                endSeconds: 10800,
                eventName: 'Evento Teste',
                border: '#d81bb8ff',
                color: '#d81bb856',
                id: '1235' 
            },
            {
                startSeconds: 11800,
                endSeconds: 15800,
                eventName: 'Evento Teste',
                border: '#d81bb8ff',
                color: '#d81bb856',
                id: '1236' 
            }
        ]
    })

    function getHeigth(startSeconds: number, endSeconds: number) {
        const diff = endSeconds - startSeconds;
        return `${(diff / 3600) * 60}px`;
    }

    function calcTop(startSeconds: number) {
        return `${(startSeconds / 3600) * 60}px`
    }

    return (
        <div className="flex flex-col">
            <div>
                {month} - {year}
            </div>
            <div className="overflow-visible">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            {days.map(day => <TableHead className="w-40" key={day}>{day}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="divide-x divide-gray-300 relative">
                            {days.map(day => <TableCell className="w-full p-0" key={day}>
                                <div className="divide-y divide-gray-300 w-40 relative">
                                    {hours.map(hour => <div className="relative" style={{ height: '60px' }} key={`${day}_${hour}`}>
                                        <div className="absolute top-1 left-3">{hour}</div>
                                    </div>)}
                                    {
                                        (events[day] ?? []).map(event => <div key={event.id} className="absolute w-full min-h-4 px-2" style={{ top: calcTop(event.startSeconds) }}>
                                            <div className="w-full rounded-md p-2" style={{ background: event.color, height: getHeigth(event.startSeconds, event.endSeconds), border: `3px solid ${event.border}` }}>
                                                {event.eventName}
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>
                            </TableCell>)
                            }
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}