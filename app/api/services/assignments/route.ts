import { getServerSession } from "next-auth";
import { OPTIONS, prisma } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { userRole } from "../../export/userrole";
import { IUserRoleResult } from "../../models/userroleresult";
import { IAssignment } from "../../models/assignemnts";

export async function DELETE(request: Request){
    const session = await getServerSession(OPTIONS);
    if (!session){
        return NextResponse.json({role: 'GUEST'}, {status: 200});
    }
    const response = await userRole();
    const userRoleResult: IUserRoleResult = await response.json();
    if (userRoleResult && userRoleResult.role?.role_name === 'TEACHER'){
        const {assignment_id}: IAssignment = await request.json();
        if (!assignment_id){
            return NextResponse.json({error: 'Hiányzó adatok!'}, {status: 400});
        }
        try{
            const assignment = await prisma.assignments.delete({
                where: {
                    assingment_id: assignment_id
                }
            })
            return NextResponse.json(assignment, {status: 200});
        }catch{    
            console.error('Hiba a csatlakozás során!');
            return NextResponse.json({error: 'Hiba a csatlakozás során!'}, {status: 500});
        }
    }
}

export async function POST(request: Request){
    const session = await getServerSession(OPTIONS);
    if (!session){
        return NextResponse.json({role: 'GUEST'}, {status: 200});
    }
    const response = await userRole();
    const userRoleResult: IUserRoleResult = await response.json();
    if (userRoleResult && userRoleResult.role?.role_name === 'TEACHER'){
        try{
            const {assignment_name, description, course_id}: IAssignment = await request.json();
            const assignment = await prisma.assignments.create({
                data: {
                    title: assignment_name,
                    description: description,
                    course_id: course_id,
                },
            });
            return NextResponse.json(assignment, {status: 200});
        }catch{
            console.error('Hiba a csatlakozás során!');
            return NextResponse.json({error: 'Hiba a csatlakozás során!'}, {status: 500});
        }
    }
    else{
        NextResponse.json(`<html><body><h1>Hiba a csatlakozás során!</h1></body></html>`, 
        { status: 500, headers: { 'Content-Type': 'text/html' } });
    }
}