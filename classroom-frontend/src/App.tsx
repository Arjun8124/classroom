import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
	DocumentTitleHandler,
	UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import Dashboard from "./pages/dashboard";
import { BookOpen, Home } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectList from "./pages/Subjects/List";
import SubjectCreate from "./pages/Subjects/Create";

function App() {
	return (
		<BrowserRouter>
			<RefineKbarProvider>
				<ThemeProvider>
					<DevtoolsProvider>
						<Refine
							dataProvider={dataProvider}
							notificationProvider={useNotificationProvider()}
							routerProvider={routerProvider}
							options={{
								syncWithLocation: true,
								warnWhenUnsavedChanges: true,
								projectId: "g4lLog-VBjNRu-4lFls8",
							}}
							resources={[
								{
									name: "dashboard",
									list: "/",
									meta: {
										label: "Home",
										icon: <Home />,
									},
								},
								{
									name: "subject",
									list: "/subject",
									create: "/subject/create",
									meta: {
										label: "Subject",
										icon: <BookOpen />,
									},
								},
							]}
						>
							<Routes>
								<Route
									element={
										<Layout>
											<Outlet />
										</Layout>
									}
								>
									<Route path="/" element={<Dashboard />} />
									<Route path="subject">
										<Route index element={<SubjectList />} />
										<Route path="create" element={<SubjectCreate />} />
									</Route>
								</Route>
							</Routes>
							<Toaster />
							<RefineKbar />
							<UnsavedChangesNotifier />
							<DocumentTitleHandler />
						</Refine>
						<DevtoolsPanel />
					</DevtoolsProvider>
				</ThemeProvider>
			</RefineKbarProvider>
		</BrowserRouter>
	);
}

export default App;
