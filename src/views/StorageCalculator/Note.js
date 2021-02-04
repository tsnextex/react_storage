import React from "react";
import { NoteBoard } from './style';

export default function Note(props) {

    return (
        <NoteBoard>
            <section>
                <section className="calctitle">
                    <p>Calculate Storage</p>
                </section>
                <section className="title"><p>What size unit do you need?</p></section>
                <section className="description">
                    Our interactive storage calculator can help. If you still need help, give our storage experts a call at (800) 457-5678. They’ll be able to assist you with all aspects of storage process.
                </section>
            </section>
        </NoteBoard>
    )
}