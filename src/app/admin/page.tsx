"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import supabase from "@/lib/db";
import type { IMenu } from "@/types/menu";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const AdminPage = () => {
    const [menus, setMenus] = useState<IMenu[]>([]);

    useEffect(() => {
        const fetchMenus = async () => {
            const { data, error } = await supabase.from("menus").select("*");
            console.log("Supabase data:", data); // log di browser
            console.log("Supabase error:", error); // cek kalau ada error
            setMenus(data || []);
        };

        fetchMenus();
    }, []);

    return (
        <div className="container mx-auto py-8">
            <div className="mb-4 w-full flex justify-between">
                <div className="text-3xl font-bold">Menu</div>
                <Button className="font-bolt">Add Menu</Button>
            </div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {menus.map((menu: IMenu) => (
                            <TableRow key={menu.id}>
                                <TableCell className="flex gap-3 item-center w-full"><Image src={menu.image} alt={menu.name} width={50} height={50} className="aspect-sequare object-cover rounded-lg" />{menu.name}</TableCell>
                                <TableCell>{menu.description.split(' ').slice(0, 5).join(' ') + '...'}</TableCell>
                                <TableCell>${menu.price}.00</TableCell>
                                <TableCell>{menu.category}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild className="cursor-pointer"><Ellipsis /></DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel className="font-bold">
                                            Action
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem className="text-yellow-500">Update</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-500 ">Delete</DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AdminPage;