"use server"

import { prisma } from "@/lib/prisma"

type Packet = {
    id: number;
    name: string;
    price: number;
    capacity: number;
    keteranganpacket: string[];
}

export async function allPacket() {
    try {
        const result = await prisma.$queryRaw<Packet[]>`
            SELECT 
                p.id, 
                p.name, 
                p.price, 
                p.capacity, 
                ARRAY_AGG(kp.keterangan) AS keteranganpacket
            FROM packet p
            LEFT JOIN keteranganpacket kp ON p.id = kp.idpacket
            GROUP BY p.id
            ORDER BY p.id ASC
        `;
        return result
          
    } catch (error) {
        console.error("Error to get packet in db : ", error);
        throw new Error("No packet found");
    }
}