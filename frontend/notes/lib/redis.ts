import Redis from "ioredis";

const redis = new Redis(16379);

export type Note = {
  title: string;
  content: string;
  updateTime: string;
};

const initialData = {
  "1702459181837":
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837":
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837":
    '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
};

export async function getAllNotes(): Promise<Array<Record<string, Note>>> {
  let data = await redis.hgetall("notes");
  if (Object.keys(data).length == 0) {
    await redis.hset("notes", initialData);
  }
  data = await redis.hgetall("notes");
  const res = new Array<Record<string, Note>>();
  for (let uuid in data) {
    res.push({
      [uuid]: JSON.parse(data[uuid]) as Note,
    });
  }
  return res;
}

export async function addNote(data: Note) {
  const uuid = Date.now().toString();
  await redis.hset("notes", uuid, JSON.stringify(data));
  return uuid;
}
export async function updateNote(uuid: string, data: Note) {
  await redis.hset("notes", uuid, JSON.stringify(data));
}

export async function getNote(uuid: string) {
  let data = JSON.parse((await redis.hget("notes", uuid)) as string) as Note;
  return data

}

export async function delNote(uuid: string) {
  return redis.hdel("notes", uuid);
}

export default redis;
