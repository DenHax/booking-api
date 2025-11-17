{
  description = "Devshell for Booking api";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;

          config = {
            allowUnfree = false;
          };
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.yazi
            pkgs.lynx
            pkgs.tmux
            pkgs.htop

            pkgs.git
            pkgs.curl
            pkgs.wget
            pkgs.jq
            pkgs.go-yq
            pkgs.go-task

            pkgs.ripgrep
            pkgs.fd
            pkgs.gat
            pkgs.fzf

            pkgs.disko
            pkgs.bun
            pkgs.npm

            pkgs.nodejs_24
            pkgs.nest-cli
          ];
        };
      }
    );
}
