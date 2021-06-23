export const footerMenu = (router) => {
  return [
    {
      id: 'footer-menu-1',
      text: 'Overview',
      icon: 'Overview',
      onClick: () => {
        router.push({ path: '/', query: { page: 'overview' } })
      }
    },
    {
      id: 'footer-menu-2',
      text: 'Submersible',
      icon: 'Submersible',
      onClick: () => {
        router.push({ path: '/', query: { page: 'submersible' } })
      }
    },
    {
      id: 'footer-menu-3',
      text: 'Input Data',
      icon: 'Input Data',
      onClick: () => {
        router.push({ path: '/input-data' })
      }
    },
    {
      id: 'footer-menu-4',
      text: 'Report',
      icon: 'Report',
      onClick: () => {
        router.push({ path: '/report' })
      }
    },
    {
      id: 'footer-menu-5',
      text: 'Access Lvl',
      icon: 'Access Level',
      onClick: () => {
        router.push({ path: '/access-level' })
        // activePage.value = 'access-level'
      }
    }
  ]
}
