<?php
include($_SERVER['DOCUMENT_ROOT'] . "/CARXOT_Framework_PHP_OOP_MVC/model/JWT.php");

function decode_token($token){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/CARXOT_Framework_PHP_OOP_MVC/model/php.ini');
    // return $jwt;

    $secret = $jwt['secret'];

    $JWT = new JWT;
    $token_dec = $JWT->decode($token, $secret);
    $rt_token = json_decode($token_dec, TRUE);
    return $rt_token;
}

function create_token($username){
    $jwt = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/CARXOT_Framework_PHP_OOP_MVC/model/php.ini');
    $header = $jwt['header'];
    $secret = $jwt['secret'];
    $payload = '{"iat":"' . time() . '","exp":"' . time() + (60) . '","username":"' . $username . '"}';

    $JWT = new JWT;
    $token = $JWT->encode($header, $payload, $secret);
    return $token;
}