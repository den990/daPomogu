<?php

namespace console\controllers;

use Yii;
use yii\console\Controller;

class StatisticController extends Controller
{
    public function actionUpdateUser()
    {
        $year = date('Y');
        $month = date('n') - 1;
        if ($month === 0) {
            $month = 12;
            $year -= 1;
        }

        $start = "$year-" . str_pad($month, 2, '0', STR_PAD_LEFT) . "-01 00:00:00";
        $end = date('Y-m-01 00:00:00');

        $users = (new \yii\db\Query())
            ->select('user_id')
            ->from('approve_task')
            ->where(['between', 'created_at', $start, $end])
            ->distinct()
            ->column();

        $stats = [];

        foreach ($users as $userId) {
            $score = (new \yii\db\Query())
                ->from('approve_task')
                ->where(['user_id' => $userId])
                ->andWhere(['between', 'created_at', $start, $end])
                ->sum('score');

            $tasksCount = (new \yii\db\Query())
                ->from('task_user tu')
                ->leftJoin('task t', 'tu.task_id = t.id')
                ->where(['tu.user_id' => $userId])
                ->andWhere(['between', 't.task_date', $start, $end])
                ->count();

            $stats[] = [
                'user_id' => $userId,
                'year' => $year,
                'month' => $month,
                'score' => (int)$score,
                'tasks_count' => (int)$tasksCount,
            ];
        }

        usort($stats, function ($a, $b) {
            return $b['score'] <=> $a['score'];
        });
        foreach ($stats as $i => &$row) {
            $row['rank'] = $i + 1;
        }
        unset($row);
        foreach ($stats as $row) {
            Yii::$app->db->createCommand()->upsert('user_monthly_statistics', $row)->execute();
        }

        echo "Monthly user statistics saved for $year-$month.\n";
    }

    public function actionUpdateOrganization()
    {
        $year = date('Y');
        $month = date('n') - 1;
        if ($month === 0) {
            $month = 12;
            $year -= 1;
        }

        $start = "$year-" . str_pad($month, 2, '0', STR_PAD_LEFT) . "-01 00:00:00";
        $end = date('Y-m-01 00:00:00');

        $organizationIds = (new \yii\db\Query())
            ->select('id')
            ->from('organization')
            ->column();

        foreach ($organizationIds as $organizationId) {
            $userStats = (new \yii\db\Query())
                ->select([
                    'user_id' => 'at.user_id',
                    'score' => 'SUM(at.score)',
                    'tasks_count' => 'COUNT(DISTINCT t.id)'
                ])
                ->from('approve_task at')
                ->innerJoin('task t', 't.id = at.task_id')
                ->where(['t.organization_id' => $organizationId])
                ->andWhere(['between', 'at.created_at', $start, $end])
                ->groupBy('at.user_id')
                ->all();

            usort($userStats, function ($a, $b) {
                return $b['score'] <=> $a['score'];
            });

            foreach ($userStats as $i => &$row) {
                $row['organization_id'] = $organizationId;
                $row['year'] = $year;
                $row['month'] = $month;
                $row['rank'] = $i + 1;
                $row['score'] = (int)$row['score'];
                $row['tasks_count'] = (int)$row['tasks_count'];
            }
            unset($row);

            foreach ($userStats as $row) {
                Yii::$app->db->createCommand()->upsert(
                    'organization_user_monthly_statistics',
                    [
                        'organization_id' => $row['organization_id'],
                        'user_id' => $row['user_id'],
                        'year' => $row['year'],
                        'month' => $row['month'],
                        'score' => $row['score'],
                        'tasks_count' => $row['tasks_count'],
                        'rank' => $row['rank'],
                        'created_at' => date('Y-m-d H:i:s'),
                    ]
                )->execute();
            }

            echo "Statistics saved for organization $organizationId — $year-$month\n";
        }

        echo "Done.\n";
    }

}