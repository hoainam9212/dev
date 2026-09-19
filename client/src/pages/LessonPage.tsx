import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { nextLessonId } from '@office-neko/shared';
import { LESSONS, TRACKS } from '../content';
import { useOs } from '../db/profile';
import { recordLessonResult } from '../progress/record';
import { LessonPlayer, type LessonResult } from '../player/LessonPlayer';
import { FinishView } from '../player/FinishView';

export function LessonPage({ id }: { id: string }) {
  const lesson = LESSONS[id];
  const navigate = useNavigate();
  const os = useOs();
  const [done, setDone] = useState<{ result: LessonResult; xpGained: number } | null>(null);

  const onFinish = useCallback(
    async (result: LessonResult) => {
      const { xpGained } = await recordLessonResult({ lessonId: id, stars: result.stars, hintsUsed: result.maxHint, timeMs: result.timeMs });
      setDone({ result, xpGained });
    },
    [id],
  );
  const onExit = useCallback(() => navigate('/'), [navigate]);

  if (!lesson) {
    return (
      <div className="card mx-auto mt-10 max-w-md space-y-3 p-6 text-center">
        <p className="text-lg font-bold">Không tìm thấy bài học này 😿</p>
        <Link to="/" className="btn-primary">Về bản đồ</Link>
      </div>
    );
  }
  if (done) return <FinishView lesson={lesson} result={done.result} xpGained={done.xpGained} nextId={nextLessonId(TRACKS, LESSONS, os, id)} />;
  return <LessonPlayer lesson={lesson} onFinish={onFinish} onExit={onExit} />;
}
