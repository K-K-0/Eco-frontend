import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Add = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">

            
            <div className="flex flex-col gap-1 w-[500px] h-[400px] border-2 shadow-2xl rounded-2xl px-5 py-5 mt-2.5">
                
                <Label className="mb-2 mt-3 text-sm font-medium text-gray-700 focus:ring" htmlFor="Username">Username</Label>
                <Input id="username" type="username" placeholder="Username" required></Input>

                <Label className="mb-2 mt-3" htmlFor="Email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" required></Input>

                <Label className="mb-2 mt-3" htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Password" required></Input>

                <Button className=" cursor-pointer mb-2 mt-3 "> sighup </Button> 
                
            </div>
             
        </div>
       
    )
}

export default Add