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
import { AiOutlineDelete, AiOutlineExport } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
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

  const handleCompressAndDownload = async () => {
    const text = JSON.stringify(datasource);
    const textBlob = new Blob([text], { type: "text/plain" });

    try {
      const compressionStream = new CompressionStream("gzip");
      const compressedStream = textBlob.stream().pipeThrough(compressionStream);

      const compressedBlob = await new Response(compressedStream).blob();

      const url = URL.createObjectURL(compressedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${datasource.name}.krsource`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Compression failed:", error);
    }
  };

  return (
    <>
      <section className="px-5 py-3">
        <Menubar className="w-min">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem onClick={handleCompressAndDownload}>
                <button className="flex items-center gap-1 w-full">
                  <AiOutlineExport />
                  <span>Export</span>
                </button>
              </MenubarItem>
              <MenubarItem onClick={handleCompressAndDownload}>
                <button className="flex items-center gap-1 w-full">
                  <GoPencil />
                  <span>Rename</span>
                </button>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={handleCompressAndDownload}>
                <button className="text-red-600 flex items-center gap-1 w-full">
                  <AiOutlineDelete />
                  <span>Delete</span>
                </button>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          {plans.length > 0 && (
            <MenubarMenu>
              <MenubarTrigger>Plans</MenubarTrigger>
              <MenubarContent>
                {plans.map((plan) => {
                  return (
                    <div key={plan.id}>
                      <MenubarItem>
                        <NavLink to={`/plan/${plan.id}`}>{plan.name}</NavLink>
                      </MenubarItem>
                      <MenubarSeparator />
                    </div>
                  );
                })}
              </MenubarContent>
            </MenubarMenu>
          )}
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
