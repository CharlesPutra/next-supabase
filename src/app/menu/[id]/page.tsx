import supabase from "@/lib/db";
import Image from "next/image";

export default async function DetailMenu({ params }: { params: Promise<{ id: string }> }) {
  // tunggu params dulu
  const { id } = await params;

  const { data: menu, error } = await supabase
    .from("menus")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !menu) {
    return <div className="p-6 text-red-500">Menu not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Image
        src={menu.image}
        alt={menu.name}
        width={600}
        height={400}
        priority
        className="w-full h-[300px] object-cover rounded-lg shadow"
      />
      <h1 className="mt-4 text-3xl font-bold">{menu.name}</h1>
      <p className="mt-2 text-gray-600">{menu.description}</p>
      <p className="mt-4 text-xl font-semibold text-emerald-600">
        Rp {menu.price.toLocaleString()}
      </p>
    </div>
  );
}
