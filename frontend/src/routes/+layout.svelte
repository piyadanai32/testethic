<script lang="ts">
  import "../app.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";

  import Header from "../components/Header.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Footer from "../components/Footer.svelte";
  import Breadcrumb from "../components/Breadcrumb.svelte";

  interface Link {
    href: string;
    text: string;
    icon: string;
    submenu?: Link[];
  }

  const navLinks: Link[] = [
    { href: "/home", text: "หน้าหลัก", icon: "fa-solid fa-house" },
    {
      href: "/services",
      text: "บริการ",
      icon: "fa-solid fa-cogs",
      submenu: [
        {
          href: "/services/form",
          text: "ส่งเอกสารคำขอ",
          icon: "fa-solid fa-file",
        },
        {
          href: "/services/monitor",
          text: "ติดตามการพิจารณา",
          icon: "fa-solid fa-file",
        },
        {
          href: "/services/check",
          text: "ตรวจสอบระยะเวลาคุ้มครอง",
          icon: "fa-solid fa-file",
        },
      ],
    },
    {
      href: "/about",
      text: "ขั้นตอนดำเนินงาน",
      icon: "fa-solid fa-info-circle",
    },
    { href: "/contact", text: "ติดต่อ", icon: "fa-solid fa-phone" },
    {
      href: "",
      text: "<hr>",
      icon: "",
    },
    {
      href: "/considerations",
      text: "พิจารณา",
      icon: "fa-solid fa-gavel",
      submenu: [
        {
          href: "/considerations/subcommittee",
          text: "ขั้นอนุกรรมการ",
          icon: "fa-solid fa-file",
        },
        {
          href: "/considerations/committee",
          text: "ขั้นกรรมการ",
          icon: "fa-solid fa-file",
        },
      ],
    },
  ];

  let breadcrumbPath: { href: string; text: string }[] = [];

  function handleMenuClick(event: CustomEvent<{ href: string; text: string }>) {
    breadcrumbPath = [{ href: event.detail.href, text: event.detail.text }];
  }
</script>

<div class="layout">
  <Header />

  <div class="main-content">
    <Sidebar links={navLinks} on:menuClick={handleMenuClick} />
    <main>
      <Breadcrumb links={breadcrumbPath} />
      <slot />
    </main>
  </div>

  <Footer />
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main-content {
    display: flex;
    flex: 1;
  }

  /* aside {
    background-color: #f4f4f4;
    padding: 1rem;
    border-right: 1px solid #ddd;
  } */

  main {
    flex: 1;
    padding: 1rem;
  }
</style>
