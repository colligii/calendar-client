'use client'

import { usePathname } from "next/navigation"
import { Avatar } from "./avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./button";

export default function SystemHeader() {
    const pathname = usePathname();

    const hiddenRoutes = ['/login'];

    if(hiddenRoutes.indexOf(pathname) > -1)
        return null;

    return (
        <div className="flex p-2 justify-end">
            <Popover>
                <PopoverTrigger>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png"/>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="pr-2">
                    <Button>Deslogar</Button>
                </PopoverContent>
            </Popover>
        </div>
    )
}