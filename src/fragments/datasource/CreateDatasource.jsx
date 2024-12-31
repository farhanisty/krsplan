import { SubjectParserImpl } from "krsplan-engine";
import DatasourceLayout from "./../../layout/DatasourceLayout";
import { useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CiCircleAlert } from "react-icons/ci";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { insert } from "./../../facades/datasourceStorage.js";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateDatasource() {
  const nameRef = useRef(null);
  const dataRef = useRef(null);
  const dialogTriggerRef = useRef(null);
  const [datasources, setDatasources] = useState([]);

  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    try {
      const subjectParserImpl = new SubjectParserImpl(dataRef.current.value);
      const parsedSubjects = subjectParserImpl.parse();
      setDatasources(parsedSubjects);
      dialogTriggerRef.current.click();
    } catch (e) {
      console.log(e);
      setError({
        message: "Data format unrecognized!",
      });
    }
  };

  const handleCommit = () => {
    insert(nameRef.current.value, datasources);
    setDatasources([]);
    nameRef.current.value = "";
    dataRef.current.value = "";
  };

  return (
    <DatasourceLayout>
      <DatasourceLayout.Header>Create New</DatasourceLayout.Header>
      <DatasourceLayout.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="text-sm" htmlFor="name">
              Name
            </label>
            <input
              ref={nameRef}
              className="block border rounded px-3 py-2 mt-2 w-full"
              type="text"
              id="name"
              placeholder="Datasource name"
              required
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="data">
              Data
            </label>
            <textarea
              ref={dataRef}
              className="block w-full py-2 px-3 mt-2 min-h-[500px] resize-none border"
              required
              name=""
              id="data"
            ></textarea>
          </div>
          {error && (
            <Alert className="mt-5" variant="destructive">
              <CiCircleAlert className="w-4 h-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          <div className="mt-5">
            <Button type="submit" className="mr-3">
              Create
            </Button>
            <Button className="shadow" variant="secondary" type="reset">
              Reset
            </Button>
          </div>
        </form>
        <DatasourceDialog
          datasources={datasources}
          dialogTriggerRef={dialogTriggerRef}
          handleCommit={handleCommit}
        />
      </DatasourceLayout.Body>
    </DatasourceLayout>
  );
}

function DatasourceDialog({ dialogTriggerRef, datasources, handleCommit }) {
  return (
    <Dialog>
      <DialogTrigger ref={dialogTriggerRef}></DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Parsed Data</DialogTitle>
          <DialogDescription>
            <ScrollArea className="h-[500px] w-fit rounded-md border p-4">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
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
                  {datasources &&
                    datasources.map((datasource) => {
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
            </ScrollArea>

            <Button onClick={handleCommit} className="mt-3 mr-3">
              Commit
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
