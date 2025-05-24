<?php

$secret = parse_ini_file('secret');

return [
    'components' => [
        'db' => [
            'dsn' => 'mysql:host=mysql;dbname=test_' . $params['dbName'],
        ],
    ],
];
