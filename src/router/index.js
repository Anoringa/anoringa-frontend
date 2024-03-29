import Index from "../components/Index";
import IndexNew from "../components/IndexNew";
import HelloWorld from "../components/HelloWorld";
//import PostsPage from "../components/PostPage";
import Post from "../components/Post";
import DevLogin from "../components/DevLogin";
import ChangeUsernamePage from "../components/ChangeUsernamePage";
import ReportPage from "../components/ReportPage";
import DocsPage from "../components/DocsPage";
///#
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };
//var User = {template: "<div>User {{ $route.params.id }}</div>",};

const routesx = [
  { name: "Foo",path: "/foo", component: Foo },
  { name: "Bar",path: "/bar", component: Bar },
  { name: "HelloWorld",path: "/hello", component: HelloWorld },
  //{ name: "User",path: "/user/:id", component: User },
  //{ name: "Post",path: "/post/:id", component: About },
  { name: "Post",path: "/post/:id", component: Post },
  { name: "Report",
    path: "/reportar", 
    component: ReportPage, 
    props: 
      route => ({ 
        query: route.query.q 
      })
  },
  { name: "Docs",path: "/tutorial", component: DocsPage },

  { name: "IndexNew",path: "/",component: IndexNew,},

  { name: "Index",path: "/new",component: Index,},
  { name: "DevLogin",path: "/DevLogin", component: DevLogin },
  { name: "perfil",path: "/perfil", component: ChangeUsernamePage },
];
/*
const router = new VueRouter({
  routesx // short for `routes: routes`
})
*/
///#
export default {
    mode: "history",
    routes: routesx,
  };
/*
export default {
  mode: "history",
  routes: [
    {
      name: "Index",
      path: "/",
      component: Index,
    },
  ],
};
*/
