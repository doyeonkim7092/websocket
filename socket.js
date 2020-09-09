const WebSocket = require("ws");

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    //클라이언트의 ip를 알아내는 방법
    console.log("새로운 클라이언트 접속", ip);

    //웹소켓 리스너-01 웹소켓으로부터 메세지 수신시,
    ws.on("message", (message) => {
      console.log(message);
    });
    //웹소켓 리스너-02 에러 발생 시,
    ws.on("error", (error) => {
      console.error(error);
    });
    //웹소켓 리스너-03 연결 종료 시,
    ws.on("close", () => {
      console.log("클라이언트 접속해제", ip);
      clearInterval(ws.interval);
    });

    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send("서버에서 클라이언트로 메세지를 보냅니다");
      }
    }, 3000);
  });
};
