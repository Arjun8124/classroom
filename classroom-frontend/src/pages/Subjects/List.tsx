import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DEPARTMENT_OPTIONS } from "@/constants";
import { Subject } from "@/types";
import { useTable } from "@refinedev/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function SubjectList() {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState("all");

	const departmentFilter =
		selected === "all"
			? []
			: [
					{
						field: "department",
						operator: "eq" as const,
						value: selected,
					},
			  ];

	const searchFilter = search
		? [{ field: "name", operator: "contains" as const, value: search }]
		: [];

	const subjectTable = useTable<Subject>({
		columns: useMemo<ColumnDef<Subject>[]>(
			() => [
				{
					id: "code",
					accessorKey: "code",
					size: 100,
					header: () => <p className="column-title pl-2">Code</p>,
					cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
				},
				{
					id: "name",
					accessorKey: "name",
					size: 200,
					header: () => <p className="column-title">Name</p>,
					cell: ({ getValue }) => (
						<span className="text-foreground">{getValue<string>()}</span>
					),
					filterFn: "includesString",
				},
				{
					id: "department",
					accessorKey: "department",
					size: 150,
					header: () => <p className="column-title">Department</p>,
					cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
				},
				{
					id: "description",
					accessorKey: "description",
					size: 300,
					header: () => <p className="column-title">Description</p>,
					cell: ({ getValue }) => (
						<span className="text-foreground truncate line-clamp-2">
							{getValue<string>()}
						</span>
					),
				},
			],
			[],
		),
		refineCoreProps: {
			resource: "subject",
			pagination: {
				pageSize: 10,
				mode: "server",
			},
			filters: {
				permanent: [...departmentFilter, ...searchFilter],
			},
			sorters: {},
		},
	});

	return (
		<ListView>
			<Breadcrumb />

			<h1 className="page-title">Subjects</h1>
			<div className="intro-row">
				<p>Quick access to essential metrics and tools!</p>

				<div className="actions-row">
					<div className="search-field">
						<Search className="search-icon" />
						<Input
							type="text"
							placeholder="Search by name..."
							className="pl-10 w-full"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<div className="flex gap-2 w-full sm:w-auto">
						<Select value={selected} onValueChange={setSelected}>
							<SelectTrigger>
								<SelectValue placeholder="Filter by department..." />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value="all">All Department</SelectItem>
								{DEPARTMENT_OPTIONS.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
							<CreateButton />
						</Select>
					</div>
				</div>
			</div>

			<DataTable table={subjectTable} />
		</ListView>
	);
}
