<?php

namespace backend\tests;
use backend\tests\AcceptanceTester;

class SiteIndexCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    // tests
    public function tryToTest(AcceptanceTester $I)
    {
        $I->amOnPage('/site/index');
        $I->waitForElement('#testButtonBackend', 10);
        $I->seeElement('#testButtonBackend');
        $I->dontSeeElement('#exampleModalBackend');
        $I->click('#exampleBtnBackend');
        $I->seeElement('#exampleModalBackend');
    }
}
