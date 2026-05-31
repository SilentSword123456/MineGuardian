import { Card, CardContent, CardHeader, CardTitle } from "@mineguardian/ui";
import { ServerControlPanel } from "@/components/ServerControlPanel";
import { ServerList } from "@/components/ServerList";
import { ServerLogsStream } from "@/components/ServerLogsStream";

export function DashboardShell() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 md:grid-cols-[2fr_1fr]">
        <section className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Server Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ServerList />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Control Plane</CardTitle>
            </CardHeader>
            <CardContent>
              <ServerControlPanel />
            </CardContent>
          </Card>
        </section>

        <section>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <ServerLogsStream />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
