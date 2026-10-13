const MESSAGES = [
  "오늘도 충분히 잘하고 있어요.",
  "천천히 가도 괜찮아요. 멈추지만 않으면 돼요.",
  "어제보다 한 걸음 더 나아간 오늘을 응원해요.",
  "지금의 노력이 분명 좋은 결과로 돌아올 거예요.",
  "힘든 날에도 여기까지 온 것만으로 대단해요.",
  "작은 시작이 큰 변화를 만들어요.",
  "실수해도 괜찮아요. 그만큼 배우고 있는 거예요.",
  "오늘 하루도 스스로를 믿어 보세요.",
  "잠깐 쉬어 가도 돼요. 쉬는 것도 실력이에요.",
  "당신의 속도가 가장 알맞은 속도예요.",
  "해낼 수 있어요. 이미 반은 온 거예요.",
  "오늘의 수고가 내일의 자신감이 될 거예요.",
  "걱정보다 훨씬 잘 해낼 거예요.",
  "웃을 일이 하나쯤은 꼭 생기는 하루가 될 거예요.",
  "포기하지 않는 모습이 참 멋져요.",
];

const DEFAULT_NAME = "여러분";
const MAX_NAME_LENGTH = 20;

function pickName(req) {
  const raw = (req.body && req.body.name) || (req.query && req.query.name) || "";
  const name = String(raw).trim().slice(0, MAX_NAME_LENGTH);
  return name || DEFAULT_NAME;
}

module.exports = (req, res) => {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    res.status(405).json({ error: "지원하지 않는 요청 방식입니다." });
    return;
  }

  const name = pickName(req);
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  const call = name === DEFAULT_NAME ? name : `${name}님`;

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ name, message, text: `${call}, ${message}` });
};
