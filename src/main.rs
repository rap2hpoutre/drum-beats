extern crate corruption;
extern crate hyper;
extern crate rustc_serialize;
extern crate glob;
extern crate rand;

use glob::glob;
use hyper::server::Request;
use corruption::Corruption;
use corruption::response::Response;

fn main() {
    // Start Corruption
    let mut corruption = Corruption::new();

    // Declare routes
    corruption
        .get("/", |_| Response::html("index.html") )
        .post("/wav", wav );

    // Serve it to the world on 127.0.0.1:8080
    corruption.serve();
}

#[derive(RustcEncodable)]
struct Wav {
    name: String,
}

fn wav(_: &Request) -> corruption::response::Response {

    // Todo : optimize this (don't reload every time)
    let files:Vec<Path> = glob("*").collect();


    Response::json(&Wav {
        name: "hello".to_string()
    })
}