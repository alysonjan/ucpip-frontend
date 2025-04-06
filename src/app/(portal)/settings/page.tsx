import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <section className="bg-gray-300 w-full flex-1 p-4 space-y-4 overflow-y-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Portal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/admissions">
                    Admissions
                  </BreadcrumbLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/patients">
                    Patients
                  </BreadcrumbLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BreadcrumbLink className="w-full" href="/administration">
                    Administration
                  </BreadcrumbLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Settings</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="bg-white p-4 rounded shadow-md shadow-slate-600 w-full">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-flow-col auto-cols-fr">
            <TabsTrigger value="portal">Portal</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="yac">Yet Another Category</TabsTrigger>
            <TabsTrigger value="misc">Misc.</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Account settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Pedro Duarte" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@peduarte" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="portal">
            <Card>
              <CardHeader>
                <CardTitle>Portal</CardTitle>
                <CardDescription>Portal settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2"></CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Appearance settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2"></CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Privacy settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2"></CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="yac">
            <Card>
              <CardHeader>
                <CardTitle>Yet Another Category</CardTitle>
                <CardDescription>Even more settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2"></CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="misc">
            <Card>
              <CardHeader>
                <CardTitle>Misc</CardTitle>
                <CardDescription>Misc settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2"></CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
