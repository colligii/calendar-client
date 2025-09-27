import { Input } from "@/components/ui/input";
import Image from "next/image";
import icon from '../../public/icon.png'
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from "@radix-ui/react-label";

export default function Login() {
    return <div className="flex flex-col md:flex-row flex-1 h-screen">
        <div className="flex absolute flex-1 w-full md:bg-gray-200 md:relative">
            <div className="absolute top-7 left-7">
                <Image src={icon} alt="Calendario Icone" width={80} height={80}></Image>
            </div>
        </div>
        <div className="flex flex-1 w-full flex-col items-center justify-center gap-3">
            <Card className="w-8/12 md:w-1/2">
                <CardHeader>
                    <CardTitle>
                        Login
                    </CardTitle>
                    <CardDescription>
                        Digite seu e-mail e senha para entrar no app
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">E-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    </div>
}