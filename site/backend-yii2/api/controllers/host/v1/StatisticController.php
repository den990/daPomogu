<?php

namespace api\controllers\host\v1;

use api\components\ApiResponse;
use common\models\Organization;
use common\models\OrganizationUserMonthlyStatistics;
use common\models\User;
use common\models\UserMonthlyStatistics;
use Yii;
use yii\web\Controller;
use yii\web\UnauthorizedHttpException;

class StatisticController extends AppController
{
    public function beforeAction($action)
    {
        if (!parent::beforeAction($action)) {
            return false;
        }

        if (!isset(Yii::$app->params['user.id']))
            throw new UnauthorizedHttpException('Доступ запрещён.');

        $user = User::findOne(['id' => Yii::$app->params['user.id'], 'is_blocked' => 0]);
        if (!$user) {
            throw new UnauthorizedHttpException('Доступ запрещён.');
        }

        return true;
    }
    public function actionGetAll()
    {
        $userId = Yii::$app->params['user.id'];
        $year = date('Y');
        $month = date('n');

        $statistic = UserMonthlyStatistics::findOne([
            'user_id' => $userId,
            'year' => $year,
            'month' => $month,
        ]);

        if (!$statistic) {
            $statistic =  UserMonthlyStatistics::find()->where([
                'year' => $year,
                'month' => $month,
            ])->limit(10)->all();

            return ApiResponse::success([
                'user' => null,
                'rank' => 0,
                'stats' => array_map(function ($item) {
                    return [
                        'user_name' => $item->user->name,
                        'user_surname' => $item->user->surname,
                        'score' => $item->score,
                        'rank' => $item->rank,
                        'tasks_count' => $item->tasks_count,
                    ];
                }, $statistic),
            ]);
        }

        $rank = $statistic->rank;
        $above = UserMonthlyStatistics::find()
            ->where(['year' => $year, 'month' => $month])
            ->andWhere(['<', 'rank', $rank])
            ->orderBy(['rank' => SORT_DESC])
            ->limit(5)
            ->all();

        $below = UserMonthlyStatistics::find()
            ->where(['year' => $year, 'month' => $month])
            ->andWhere(['>', 'rank', $rank])
            ->orderBy(['rank' => SORT_ASC])
            ->limit(5)
            ->all();

        $countAbove = count($above);
        $countBelow = count($below);

        if ($countAbove < 5) {
            $extra = 5 - $countAbove;
            $belowExtra = UserMonthlyStatistics::find()
                ->where(['year' => $year, 'month' => $month])
                ->andWhere(['>', 'rank', $rank])
                ->orderBy(['rank' => SORT_ASC])
                ->offset($countBelow)
                ->limit($extra)
                ->all();
            $below = array_merge($below, $belowExtra);
        } elseif ($countBelow < 5) {
            $extra = 5 - $countBelow;
            $aboveExtra = UserMonthlyStatistics::find()
                ->where(['year' => $year, 'month' => $month])
                ->andWhere(['<', 'rank', $rank])
                ->orderBy(['rank' => SORT_DESC])
                ->offset($countAbove)
                ->limit($extra)
                ->all();
            $above = array_merge($above, $aboveExtra);
        }

        $result = array_merge(
            array_reverse($above),
            [$statistic],
            $below
        );

        return ApiResponse::success([
            'user' => $userId,
            'rank' => $rank,
            'stats' => array_map(function ($item) {
                return [
                    'user_name' => $item->user->name,
                    'user_surname' => $item->user->surname,
                    'score' => $item->score,
                    'rank' => $item->rank,
                    'tasks_count' => $item->tasks_count,
                ];
            }, $result),
        ]);
    }


    public function actionGetByOrganization($organization_id)
    {
        $userId = Yii::$app->params['user.id'];
        $year = date('Y');
        $month = date('n');

        $statistic = OrganizationUserMonthlyStatistics::findOne([
            'organization_id' => $organization_id,
            'user_id' => $userId,
            'year' => $year,
            'month' => $month,
        ]);

        if (!$statistic) {
            return ApiResponse::success(['message' => 'Нет статистики']);
        }

        $rank = $statistic->rank;
        $above = OrganizationUserMonthlyStatistics::find()
            ->where(['year' => $year, 'month' => $month, 'organization_id' => $organization_id,])
            ->andWhere(['<', 'rank', $rank])
            ->orderBy(['rank' => SORT_DESC])
            ->limit(5)
            ->all();

        $below = OrganizationUserMonthlyStatistics::find()
            ->where(['year' => $year, 'month' => $month, 'organization_id' => $organization_id,])
            ->andWhere(['>', 'rank', $rank])
            ->orderBy(['rank' => SORT_ASC])
            ->limit(5)
            ->all();

        $countAbove = count($above);
        $countBelow = count($below);

        if ($countAbove < 5) {
            $extra = 5 - $countAbove;
            $belowExtra = OrganizationUserMonthlyStatistics::find()
                ->where(['year' => $year, 'month' => $month, 'organization_id' => $organization_id,])
                ->andWhere(['>', 'rank', $rank])
                ->orderBy(['rank' => SORT_ASC])
                ->offset($countBelow)
                ->limit($extra)
                ->all();
            $below = array_merge($below, $belowExtra);
        } elseif ($countBelow < 5) {
            $extra = 5 - $countBelow;
            $aboveExtra = OrganizationUserMonthlyStatistics::find()
                ->where(['year' => $year, 'month' => $month, 'organization_id' => $organization_id,])
                ->andWhere(['<', 'rank', $rank])
                ->orderBy(['rank' => SORT_DESC])
                ->offset($countAbove)
                ->limit($extra)
                ->all();
            $above = array_merge($above, $aboveExtra);
        }

        $result = array_merge(
            array_reverse($above),
            [$statistic],
            $below
        );

        return ApiResponse::success([
            'user' => $userId,
            'rank' => $rank,
            'stats' => array_map(function ($item) {
                return [
                    'user_name' => $item->user->name,
                    'user_surname' => $item->user->surname,
                    'score' => $item->score,
                    'rank' => $item->rank,
                    'tasks_count' => $item->tasks_count,
                ];
            }, $result),
        ]);
    }

    public function actionGetMyOrganization()
    {
        $userId = Yii::$app->params['user.id'];
        $user = User::findOne(['id' => $userId]);
        if (!$user->organizationOwner)
            return ApiResponse::error(400, null, Yii::t('app', 'Вы не является создателем организации'));

        $year = date('Y');
        $month = date('n');

        $statistic = OrganizationUserMonthlyStatistics::find()->where([
            'organization_id' => $user->organizationOwner->id,
            'year' => $year,
            'month' => $month,
        ])->orderBy(['rank' => SORT_ASC])->all();

        if (!$statistic) {
            return ApiResponse::success(['message' => 'Нет статистики']);
        }

        return ApiResponse::success([
            'user' => $userId,
            'stats' => array_map(function ($item) {
                return [
                    'user_name' => $item->user->name,
                    'user_surname' => $item->user->surname,
                    'score' => $item->score,
                    'rank' => $item->rank,
                    'tasks_count' => $item->tasks_count,
                ];
            }, $statistic),
        ]);
    }
}