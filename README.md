# SQLTranspiler

A simplified SQL condition such as a WHERE or ON clause can be represented as a JavaScript object in
prefix notation. This function converts a condition object to a SQL clause. For example:<br><br>

{$eq: {name: ':name'}};<br>
transpiles to:<br>
'name' = :name<br><br>

Assumes the passed-in condition is valid, and supports the following condition specifications:<br>
\<condition> ::= "{" \<comparison> | \<logical-condition> "}"<br>
\<comparison> ::= \<comparison-operator> ":" "{" \<column> ":" \<value> "}"<br>
\<logical-condition> ::= \<boolean-operator> ":" "[" \<condition> {"," \<condition>} "]"<br>
\<comparison-operator> ::= "$eq" | "$neq" | "$lt" | "$lte" | "$gt" | "$gte"<br>
\<boolean-operator> ::= "$and" | "$or"<br>
\<value> ::= \<parameter> | \<column><br>
\<column> ::= \<string><br>
\<parameter> ::= :\<string>
