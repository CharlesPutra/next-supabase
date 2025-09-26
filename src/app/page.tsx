"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/db";
import type { IMenu } from "@/types/menu";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
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
      <h1 className="text-3xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {menus.map((menu: IMenu) => ( //buat mapping atau lopping buat ambil dan nampilin data
          <Card key={menu.id} className="relative">
            <CardContent className="">
              {/* Badge di atas gambar */}
              <div className="relative">
                <Image
                  src={menu.image}
                  alt={menu.name}
                  width={200}
                  height={200}
                  className="w-full h-[30vh] object-cover rounded-t-lg"
                />
                <Badge className="absolute top-3 left-3 flex items-center gap-1 rounded-full px-3  py-1.5 
                       bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white 
                       shadow-md text-sm font-semibold">
                  {menu.category}
                </Badge>
              </div>

              <div className="p-4 flex justify-between">
                <div>
                  <h4 className="font-bold text-xl">{menu.name}</h4>
                  <Badge variant={"outline"} className="rounded-full px-4 py-1 text-sm font-semibold border-2 border-emerald-500 text-emerald-600 bg-emerald-50">${menu.price}.00</Badge>
                  <p className="text-gray-600">{menu.description}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size={"lg"}>Buy Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
