import * as TablerIcons from '@tabler/icons-react';

export default function AdminSidebar({currSlug, isCollapsed, onCollapse}) {
  let links = [
    {
      name: "Dashboard",
      slug: "/admin",
      icon: <TablerIcons.IconHome/>,
    },
    {
      name: "Posts",
      slug: "/admin/posts",
      icon: <TablerIcons.IconFile/>,
    },
    {
      name: "Settings",
      slug: "/admin/settings",
      icon: <TablerIcons.IconSettings/>,
    },
    {
      name: "Logout",
      slug: "/admin/logout",
      icon: <TablerIcons.IconLogout/>,
    }
  ]
  let actions = [
    {
      name: "Create Post",
      slug: "/admin/posts/create",
      icon: <TablerIcons.IconPlus/>,
    }
  ]
  return (
    <>
      <div className={isCollapsed ? (
        "transition-all duration-500 p-2 h-fit rounded-lg static w-[52px]"
      ) : (
        "transition-all duration-500 p-4 bg-sky-200 min-w-64 w-64 max-w-64 rounded-r-lg flex flex-col h-screen static"
      )}>
        <div className="min-w-64 w-64 max-w-64 flex transition-all duration-500">
          <button
            onClick={() => {
              onCollapse();
            }}
            className={isCollapsed ? (
              "transition-all duration-500 w-fit rounded-md p-3 hover:bg-sky-100"
            ) : (
              "transition-all duration-500 w-fit rounded-md p-3 hover:bg-sky-300"
            )}
          >
            {isCollapsed ? (
              <>
                <TablerIcons.IconMenu2/>
              </>
            ) : (
              <>
                <TablerIcons.IconX/>
              </>
            )}
          </button>
        </div>
        {!isCollapsed && <div className="transition-all duration-500 flex gap-2 flex-col mt-4">
          {actions.map((action, index) => (
            <a
              key={index}
              href={action.slug}
              className={"transition-all duration-500 flex items-center p-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white hover:scale-105"}
            >
              <div className="transition-all duration-500 mr-2">
                {action.icon}
              </div>
              <div>
                {action.name}
              </div>
            </a>
          ))}
          <hr
            className={"transition-all duration-300 my-2 border-sky-800"}
          />
          {links.map((link, index) => (
            <a
              key={index}
              href={link.slug}
              className={currSlug === link.slug ? (
                "hover:scale-105 transition-all duration-500 flex items-center p-2 rounded-md bg-sky-300 hover:bg-sky-400"
              ) : (
                "hover:scale-105 transition-all duration-500 flex items-center p-2 rounded-md hover:bg-sky-400"
              )}
            >
              <div className="transition-all duration-500 mr-2">
                {link.icon}
              </div>
              <div>
                {link.name}
              </div>
            </a>
          ))}
        </div>}
      </div>
    </>
  )
}