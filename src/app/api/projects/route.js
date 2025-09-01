import {
  getProjects,
  createProject,
  deleteProject,
  updateProject,
} from "@/server/controllers/projectController";


export async function GET(request){
  return getProjects(request);
}

export async function POST(request){
  return createProject(request);
}

export async function PUT(request){
  return updateProject(request);
}

export async function DELETE(request){
  return deleteProject(request)
}
