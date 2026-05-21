function createId(name) {
  const key = `broadcast_channel_${name}`;
  let id = +localStorage.getItem(key) || 0;
  if (!id) {
    id = 0;
  }
  id++;
  localStorage.setItem(key, id);
  return id;
}

function sendMsg(msg, channel) {
  channel.postMessage({
    id: channel.id,
    msg
  });
}

export function createChanel(name) {
  const channel = new BroadcastChannel(name);
  channel.id = createId(name);
  channel.listenners = new Set();
  sendMsg("1", channel);
  window.addEventListener("upload", () => {
    sendMsg("11", channel);
  })
  channel.addEventListener("message", (event) => {
    if (event.data.msg === "1") {
      // console.log("当前页面打开了名片推送日志");
    } else if (event.data.msg === "2") {

    } else if (event.data.msg === "3") {

    }
  });
  return channel;
}
