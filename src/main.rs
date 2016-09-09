extern crate corruption;
extern crate hyper;
extern crate rustc_serialize;
extern crate glob;
extern crate rand;
extern crate redis;


use glob::glob;
use hyper::server::Request;
use corruption::Corruption;
use corruption::response::Response;
use rand::Rng;
use std::path::PathBuf;
use redis::Commands;

fn main() {
    // Start Corruption
    let mut corruption = Corruption::new();

    // Declare routes
    corruption
        .get("/", |_| Response::html("index.html") )
        .get("/wav", wav )
        .get("/counter", counter );

    // Serve it to the world on 127.0.0.1:8080
    corruption.serve();
}

#[derive(RustcEncodable)]
struct Wav {
    name: String,
}

fn wav(_: &Request) -> corruption::response::Response {

    // Update counter in redis
    let client = redis::Client::open("redis://127.0.0.1/").unwrap();
    let con = client.get_connection().unwrap();
    let c: isize = con.get("counter").unwrap();
    let _ : () = con.set("counter", c+1).unwrap();

    // Return a wav
    // Todo : optimize this (don't reload every time)
    let files = list("static/wav/*");
    let file = rand::thread_rng().choose(&files).unwrap().to_str().unwrap().to_string();

    Response::json(&Wav {
        name: file
    })
}

fn list(pattern: &str) -> Vec<PathBuf> {
    glob(pattern).unwrap().map(|r| r.unwrap()).collect()
}

#[derive(RustcEncodable)]
struct Counter {
    value: isize,
}

// Counter (get page view number)
fn counter(_: &Request) -> corruption::response::Response {
    let client = redis::Client::open("redis://127.0.0.1/").unwrap();
    let con = client.get_connection().unwrap();
    let c = con.get("counter").unwrap();

    Response::json(&Counter {
        value: c
    })
}