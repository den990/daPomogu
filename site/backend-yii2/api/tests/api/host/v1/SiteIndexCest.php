<?php
namespace api\tests\host\v1;
use api\tests\ApiTester;
class SiteIndexCest
{
    const URL = '/host/v1/site/index';
    const API_KEY = 'local-key';

    public function _before(ApiTester $I)
    {
    }

    // tests
    public function successful(ApiTester $I)
    {
        $I->haveHttpHeader('content-type', 'application/json');
        $I->haveHttpHeader('Authorization', 'Bearer ' . self::API_KEY);
        $I->sendPost(self::URL, [
            'SiteIndex' => [
                'param' => 'API Method is working',
            ]
        ]);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::OK);
        $I->seeResponseIsJson();
        $I->seeResponseContains('"success":true');
        $I->seeResponseContains('{"modelParam":"API Method is working"}');
    }

    public function wrongMethod(ApiTester $I)
    {
        $I->haveHttpHeader('content-type', 'application/json');
        $I->haveHttpHeader('Authorization', 'Bearer ' . self::API_KEY);
        $I->sendGet(self::URL);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::METHOD_NOT_ALLOWED);
    }

    public function wrongKey(ApiTester $I)
    {
        $I->haveHttpHeader('content-type', 'application/json');
        $I->haveHttpHeader('Authorization', 'Bearer wrong' . self::API_KEY);
        $I->sendPost(self::URL);
        $I->seeResponseCodeIs(\Codeception\Util\HttpCode::UNAUTHORIZED);
    }
}
