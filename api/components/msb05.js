const start = async function (component, components, ctx) {
  const { $notifyLoading, store } = ctx
  await $notifyLoading.show(ctx, 'Sending Command...', `Turn on ${component.description} / ${component.name}`)
  await store.dispatch('component/sendCommand', { ctx, name: 'HOLDING_MOTOR_MSB05_Run', value: true })
  $notifyLoading.hide()
}
const stop = async function (component, components, ctx) {
  const { $notifyLoading, store } = ctx
  await $notifyLoading.show(ctx, 'Sending Command...', `Turn off ${component.description} / ${component.name}`)
  await store.dispatch('component/sendCommand', { ctx, name: 'HOLDING_MOTOR_MSB05_Stop', value: true })
  $notifyLoading.hide()
}

export default {
  type: 'motor',
  id: 'msb05',
  name: 'M.SB05',
  description: 'Motor SUMERSIBLE',
  state: {
    active: false,
    alarm_1: false,
    alarm_2: false,
    auto: false
  },
  meta: {
    defaultImg: 'MSB05_Run',
    img: 'MSB05',
    position: {
      x: 1483.23,
      y: 464.18
    },
    componentSpot: {
      position: {
        x: 1483,
        y: 531
      },
      size: {
        w: 30,
        h: 53
      }
    },
    page: 'submersible',
    panel: {
      position: 'right'
    }
  },
  checkAlarm: (item) => {
    return (item.state.alarm_1 || item.state.alarm_2)
  },
  panel: (item) => {
    return `
      <div class="header">${item.name}</div>
      <div class="content">
        <div>${(item.state.active) ? 'Running' : 'Off'}</div>
        <div>${(item.state.auto) ? 'Automatic' : 'Manual'}</div>
      </div>
    `
  },
  menu: (item) => {
    return [
      {
        name: 'Control',
        child: [
          { type: 'button', name: 'button_start', class: 'icon green', text: '', icon: ['fas', 'play'], disable: (item.state.active || item.state.auto), onClick: start },
          { type: 'button', name: 'button_stop', class: 'icon red', text: '', icon: ['fas', 'stop'], disable: (!item.state.active || item.state.auto), onClick: stop }
        ]
      },
      {
        name: 'Alarm',
        child: [
          {
            type: 'display',
            name: 'display_alarm_1',
            render: item => `
              <div class="tw-flex tw-flex-col">
                <div>
                  <div class="badge-box ${(item.state.alarm_1) ? 'red' : ''}"></div> Circuit Breaker
                </div>
                <div>
                  <div class="badge-box ${(item.state.alarm_2) ? 'red' : ''}"></div> Disconnected
                </div>
              </div>
            `,
            onClick: (item) => {}
          }
        ]
      },
      {
        name: 'Mode',
        class: 'tw-w-full',
        child: [
          { type: 'button', name: 'button_auto', class: `fixed ${(item.state.auto ? 'green' : 'red')}`, text: (item.state.auto ? 'Auto' : 'Manual'), disable: (false) }
        ]
      }
    ]
  },
  onImgShow: (item) => {
    let name = `${item.meta.img}`
    if (item.state.alarm_1) {
      name += '_Alarm'
    } else if (item.state.active) {
      name += '_Run'
    } else {
      return null
    }
    return name
  }
}
