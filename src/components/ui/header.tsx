import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";

interface Props {
  title: string;
  desc?: string;
  breadcrumbs?: {
    items: {
      label: string;
      href: string;
    }[];
    page: string;
  };
}

export const Header = ({ title, desc, breadcrumbs }: Props) => {
  return (
    <>
      <div className="mb-2 flex flex-col gap-4">
        <h1 className="text-2xl text-left font-bold col-span-full">{title}</h1>
        {desc && <p className="text-muted-foreground">{desc}</p>}
        {breadcrumbs && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs?.items.map((item, key) => (
                <>
                  <BreadcrumbItem key={key}>
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator key={key} />
                </>
              ))}
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumbs?.page}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </>
  );
};
