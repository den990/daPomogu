<?php
namespace frontend\tests;

use frontend\tests\AcceptanceTester;

class SiteIndexCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    // tests
    public function tryToTest(AcceptanceTester $I)
    {
        $I->amOnPage('/site/index');
        $I->waitForElement('#testButton', 10);
        $I->seeElement('#testButton');
        $I->dontSeeElement('#exampleModal');
        $I->click('#exampleBtn');
        $I->seeElement('#exampleModal');
    }
}
