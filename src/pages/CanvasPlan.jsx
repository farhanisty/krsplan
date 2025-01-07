import RenderBySubject from "./../fragments/plan/renderer/RenderBySubject";
import RenderNonGrouped from "./../fragments/plan/renderer/RenderNonGrouped.jsx";
import RenderByDay from "./../fragments/plan/renderer/RenderByDay.jsx";
import RenderByLecturer from "./../fragments/plan/renderer/RenderByLecturer.jsx";
import ChoosedRenderer from "./../fragments/plan/renderer/ChoosedRenderer.jsx";
import UnavailableView from "./../fragments/plan/UnavailableView.jsx";
import PlanManager from "./../facades/PlanManager.js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import SidebarLayout from "./../layout/SidebarLayout.jsx";
import { useState, useEffect, useRef } from "react";
import ScheduleTableApp from "./../fragments/plan/ScheduleTableApp";
import { PiStudent } from "react-icons/pi";
import { FaLayerGroup } from "react-icons/fa";
import { RxValueNone } from "react-icons/rx";
import { TbMathFunction } from "react-icons/tb";
import { MdOutlineCalendarToday } from "react-icons/md";
import { HiOutlineDuplicate } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineDelete, AiOutlineExport } from "react-icons/ai";
import { remove, get, duplicate } from "./../facades/planStorage.js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const getSimiliarPlans = (id, datasourceId) => {
  return get().filter((p) => {
    return p.datasourceId === datasourceId && p.id != id;
  });
};

export default function CanvasPlan() {
  const { id } = useParams();
  const planManager = new PlanManager(id);
  const navigate = useNavigate();

  const [similarPlans, setSimilarPlans] = useState(
    getSimiliarPlans(id, planManager.plan.datasourceId),
  );
  const [openDuplicateDialog, setOpenDuplicateDialog] = useState(false);
  const [groupBy, setGroupBy] = useState("none");
  const [available, setAvailable] = useState(planManager.available);
  const [choosed, setChoosed] = useState(planManager.plan.data.choosed);
  const [unavailable, setUnavailable] = useState(
    planManager.plan.data.unavailable,
  );
  const [duplicateName, setDuplicateName] = useState(
    `${planManager.plan.name} - copy`,
  );

  const deleteAlertRef = useRef(null);

  const chooseAction = (id) => {
    planManager.choose(id);

    setChoosed(planManager.choosed);
    setAvailable(planManager.available);
    setUnavailable(planManager.unavailable);
  };

  const unchooseAction = (id) => {
    planManager.unchoose(id);

    setChoosed(planManager.choosed);
    setAvailable(planManager.available);
    setUnavailable(planManager.unavailable);
  };

  return (
    <SidebarLayout>
      <header className="my-3 mx-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavLink to="/">Plan</NavLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{planManager.plan.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <section className="mx-5">
        <Menubar className="w-min">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem
                onClick={() => {
                  setOpenDuplicateDialog(true);
                }}
              >
                <button className="flex items-center gap-1 w-full">
                  <HiOutlineDuplicate></HiOutlineDuplicate>
                  <span>Duplicate</span>
                </button>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                <button
                  onClick={() => {
                    deleteAlertRef.current.click();
                  }}
                  className="text-red-600 flex items-center gap-1 w-full h-full cursor-pointer hover:font-semibold hover:text-red-600"
                >
                  <AiOutlineDelete />
                  <span>Delete</span>
                </button>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          {similarPlans.length > 0 && (
            <MenubarMenu>
              <MenubarTrigger>Similar</MenubarTrigger>
              <MenubarContent>
                {similarPlans.map((p) => {
                  return (
                    <>
                      <MenubarItem key={p.id}>
                        <a href={`/plan/${p.id}`}>
                          <button className="flex items-center gap-1 w-full">
                            <span>{p.name}</span>
                          </button>
                        </a>
                      </MenubarItem>
                      <MenubarSeparator />
                    </>
                  );
                })}
              </MenubarContent>
            </MenubarMenu>
          )}
        </Menubar>
        <Dialog open={openDuplicateDialog}>
          <DialogContent className="max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Duplicate Plan</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="mb-5">
                <Label className="mb-3 block">Name</Label>
                <Input
                  onChange={(e) => {
                    setDuplicateName(e.target.value);
                  }}
                  value={duplicateName}
                  type="text"
                  placeholder="insert name"
                />
              </div>

              <Button
                onClick={() => {
                  duplicate(planManager.plan.id, duplicateName);
                  setSimilarPlans(get(), planManager.plan.datasourceId);
                  setOpenDuplicateDialog(false);
                }}
                className="inline-block mr-3"
              >
                Duplicate
              </Button>
              <Button
                onClick={() => {
                  setOpenDuplicateDialog(false);
                }}
                variant="secondary"
              >
                Cancel
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger ref={deleteAlertRef}></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                datasource.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  remove(id);
                  navigate("/");
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      <ScheduleTableApp
        choosed={choosed}
        subjects={planManager.plan.datasource.datasource}
      />

      <section className="flex my-5 mx-5 gap-3 h-[100vh] bg-slate-50 overflow-y-hidden">
        <ChoosedRenderer
          choosed={choosed}
          subjects={planManager.plan.datasource.datasource}
          unchooseAction={unchooseAction}
        />
        <div className="bg-slate-50 border w-3/4 px-3 py-2 h-[100vh] overflow-y-hidden">
          <header className="text-slate-800 pb-5 mb-3 border-b flex justify-between">
            <div>
              <h1>Available</h1>
              <span className="text-sm text-slate-500">
                Total Item: {available.length}
              </span>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline" className="text-xs">
                    <FaLayerGroup className="text-sm" />
                    Group by :{" "}
                    <span className="text-slate-500 capitalize">{groupBy}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setGroupBy("none")}
                    disabled={groupBy === "none" ? true : false}
                  >
                    <RxValueNone />
                    None
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setGroupBy("subject")}
                    disabled={groupBy === "subject" ? true : false}
                  >
                    <TbMathFunction />
                    Subject
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setGroupBy("lecturer")}
                    disabled={groupBy === "lecturer" ? true : false}
                  >
                    <PiStudent />
                    Lecturer
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setGroupBy("day")}
                    disabled={groupBy === "day" ? true : false}
                  >
                    <MdOutlineCalendarToday />
                    Day
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {groupBy === "none" && (
            <RenderNonGrouped
              available={available}
              subjects={planManager.plan.datasource.datasource}
              chooseAction={chooseAction}
            />
          )}
          {groupBy === "subject" && (
            <RenderBySubject
              available={available}
              subjects={planManager.plan.datasource.datasource}
              chooseAction={chooseAction}
            />
          )}
          {groupBy === "lecturer" && (
            <RenderByLecturer
              available={available}
              subjects={planManager.plan.datasource.datasource}
              chooseAction={chooseAction}
            />
          )}
          {groupBy === "day" && (
            <RenderByDay
              available={available}
              subjects={planManager.plan.datasource.datasource}
              chooseAction={chooseAction}
            />
          )}
        </div>
      </section>

      <section className="mx-5 my-3 h-[100vh]">
        <UnavailableView
          unavailable={unavailable}
          subjects={planManager.plan.datasource.datasource}
        ></UnavailableView>
      </section>
    </SidebarLayout>
  );
}
