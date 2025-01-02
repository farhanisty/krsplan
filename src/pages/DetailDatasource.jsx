import SidebarLayout from "./../layout/SidebarLayout.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { NavLink, useParams } from "react-router-dom";
import { getById } from "./../facades/datasourceStorage.js";
import { get as getPlans } from "./../facades/planStorage.js";

export default function DetailDatasource() {
  const { id } = useParams();

  const datasource = getById(id);

  return (
    <SidebarLayout>
      <Header datasource={datasource} />
      <Body datasource={datasource} />
      <h1>hello world</h1>
    </SidebarLayout>
  );
}

function Header({ datasource }) {
  return (
    <header className="mx-5 my-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <NavLink to="/datasource">Datasource</NavLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{datasource.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

function Body({ datasource }) {
  const plans = getPlans().filter((plan) => {
    return plan.datasourceId === datasource.id;
  });

  return (
    <>
      <section className="px-5 py-3">
        <Menubar className="w-min">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Export</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Plans</MenubarTrigger>
            <MenubarContent>
              {plans.map((plan) => {
                return (
                  <div key={plan.id}>
                    <MenubarItem>Duplicate</MenubarItem>;
                    <MenubarSeparator />
                  </div>
                );
              })}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </section>
      <section className="mx-5 my-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Prodi</TableHead>
              <TableHead>Kode</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>SKS</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Jumlah Mahasiswa</TableHead>
              <TableHead className="w-[150px]">Jadwal</TableHead>
              <TableHead>Ruangan</TableHead>
              <TableHead className="w-[500px]">Dosen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datasource.datasource.map((datasource) => {
              return (
                <TableRow key={datasource.id}>
                  <TableCell className="font-medium">
                    {datasource.studyProgram}
                  </TableCell>
                  <TableCell>{datasource.code}</TableCell>
                  <TableCell>{datasource.name}</TableCell>
                  <TableCell>{datasource.credits}</TableCell>
                  <TableCell>{datasource.className}</TableCell>
                  <TableCell>{datasource.numberOfStudent}</TableCell>
                  <TableCell>{`${datasource.schedule.day} ${datasource.schedule.intervalTime.start.hour}:${datasource.schedule.intervalTime.start.minute}-${datasource.schedule.intervalTime.end.hour}:${datasource.schedule.intervalTime.end.minute}`}</TableCell>
                  <TableCell>{datasource.classRoom}</TableCell>
                  <TableCell>
                    <ul>
                      {datasource.lecturers.map((lecturer) => {
                        return <li key={lecturer}>{lecturer}</li>;
                      })}
                    </ul>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </>
  );
}
