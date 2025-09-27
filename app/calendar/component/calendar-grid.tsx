"use client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useRef, useState } from "react";
import {toast, Toaster} from 'sonner';

const days = Array.from({ length: 30 }, (_, index) => index + 1);
const hours = Array.from({ length: 24 }, (_, index) => index);

const monthArr = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

export default function CalendarGrid() {
    const [nowDate, setNowDate] = useState(new Date());
    const [month, setMonth] = useState(9);
    const [year, setYear] = useState(2025);
    const intervalRef = useRef(null);
    const elemOverflow = useRef(null);
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
                border: '#1bd2d8ff',
                color: '#1ba2d856',
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
        ],
        27: [
            {
                startSeconds: 43000,
                endSeconds: 52000,
                eventName: 'Evento Teste',
                border: '#d81bb8ff',
                color: '#d81bb856',
                id: '12396'
            }
        ]
    })

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setNowDate(new Date());
        }, 60000);
        return () => clearInterval(intervalRef.current);
    }, [])

    useEffect(() => {
        const tableContainer = elemOverflow.current.querySelector('[data-slot="table-container"]');
        if(tableContainer && isActualDate()) {
            tableContainer.scrollTo((nowDate.getDate() - 2) * 160, getTop() - 60*2)
        }
    }, [])

    function getHeigth(startSeconds: number, endSeconds: number) {
        const diff = endSeconds - startSeconds;
        return `${(diff / 3600) * 60}px`;
    }

    function calcTop(startSeconds: number) {
        return `${(startSeconds / 3600) * 60}px`
    }

    function isActualDate() {
        return month === (nowDate.getMonth() + 1) && year === nowDate.getFullYear()
    }

    function canRenderLine(date: number) {
        return isActualDate() && date === nowDate.getDate()
    }

    function getTop() {
        return nowDate.getHours() * 60 + nowDate.getMinutes()
    }

    function topInPx() {
        const top = getTop() - 2;
        return `${top}px`
    }

    function toaster() {
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },}
        )
    }

    return (
        <div className="flex flex-col">
            <div ref={elemOverflow}  className="flex flex-col h-[90vh] overflow-auto">
                <div className="p-3" onClick={() => toaster()}>
                    {monthArr[month - 1]} - {year}
                </div>
                <Table className="w-full relative">
                    <TableHeader className="sticky top-0 bg-white z-10">
                        <TableRow>
                            {days.map(day => <TableHead className="w-40" key={day}>{day}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="divide-x divide-gray-300 relative">
                            {days.map(day => <TableCell className="w-full p-0" key={day}>
                                <div className="divide-y divide-gray-300 w-40 relative">
                                    {hours.map(hour => <div className="relative" style={{ height: '60px' }} key={`${day}_${hour}`}>
                                        <div className="absolute top-1 font-extralight left-3">{String(hour).padStart(2, '0')}:00</div>
                                    </div>)}
                                    {
                                        (events[day] ?? []).map(event => <div key={event.id} className="absolute w-full min-h-4 px-2 cursor-pointer" style={{ top: calcTop(event.startSeconds) }}>
                                            <div className="w-full rounded-md p-2" style={{ background: event.color, height: getHeigth(event.startSeconds, event.endSeconds), border: `3px solid ${event.border}` }}>
                                                {event.eventName}
                                            </div>
                                        </div>
                                        )
                                    }
                                    {canRenderLine(day) && <div className="w-full absolute h-1 bg-red-400" style={{ top: topInPx() }}></div>}
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