"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/db";
import type { IMenu } from "@/types/menu";

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
    <div>
      <h1>Daftar Menu</h1>
      <pre>{JSON.stringify(menus, null, 2)}</pre>
    </div>
  );
}
