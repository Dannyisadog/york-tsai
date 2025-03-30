import { NextResponse } from "next/server";
import { OracleStorageService } from "@/app/services/oracle-object-storage.service";
import { auth } from "@/auth";

export const GET = auth(async (req) => {
  if (!req.auth || !req.auth.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const oracleStorageService = new OracleStorageService();
  const par = await oracleStorageService.getPreauthenticatedRequest();
  return NextResponse.json(par);
}) as any;
