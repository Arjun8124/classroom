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
import { Search } from "lucide-react";
import { useState } from "react";

export default function SubjectList() {
	const [search, setSearch] = useState("");
	const [selected, setSelected] = useState("all");
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
						</Select>
					</div>
				</div>
			</div>
		</ListView>
	);
}
